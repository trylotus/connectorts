
// // HistoricalEvents queries past blocks for the events emitted by the given contract addresses.
// // These events are provided in a channel and ready to be consumed by the caller.
// func HistoricalEvents(ctx context.Context, client *ethclient.Client, addresses []common.Address, fromBlock uint64, toBlock uint64) (<-chan types.Log, error) {
// 	ch := make(chan types.Log, 1000)

// 	if fromBlock == toBlock {
// 		close(ch)
// 		return ch, nil
// 	}

// 	if toBlock == 0 {
// 		var err error
// 		toBlock, err = client.BlockNumber(ctx)
// 		if err != nil {
// 			log.Error().Err(err).Msg("failed to get block number")
// 			close(ch)
// 			return ch, err
// 		}
// 	}

// 	if fromBlock >= toBlock {
// 		close(ch)
// 		return ch, nil
// 	}

// 	go func(logs chan types.Log) {
// 		defer close(logs)

// 		//	Store failed queries for retry
// 		failedQueries, err := ChunkedFilterLogs(ctx, client, addresses, fromBlock, toBlock, logs, nil)
// 		if err != nil {
// 			log.Warn().Err(err).Uint64("from", fromBlock).Uint64("to", toBlock).Msg("some intervals failed during backfill, retying...")
// 		}

// 		// Count the number of consecutive failures. Reset the counter after every success.
// 		// If fail 2 times consecutively, start doing exponential backoff before retrying again.
// 		failCount := 0

// 		for len(failedQueries) > 0 {
// 			// Get a failed query from the beginning of the queue
// 			q := failedQueries[0]
// 			failedQueries = failedQueries[1:]

// 			fq, err := ChunkedFilterLogs(ctx, client, q.Addresses, q.FromBlock.Uint64(), q.ToBlock.Uint64(), logs, nil)
// 			if err != nil {
// 				log.Warn().Err(err).Uint64("from", q.FromBlock.Uint64()).Uint64("to", q.ToBlock.Uint64()).Msg("some intervals failed during backfill, retrying...")
// 			}

// 			if len(fq) > 0 {
// 				// Put failed queries to the end of the queue to retry later
// 				failedQueries = append(failedQueries, fq...)
// 				failCount++
// 			} else {
// 				failCount = 0
// 			}

// 			if failCount >= 2 {
// 				// After first failure, do exponential backoff with 10% jitter
// 				backoff := float64(int(1) << (failCount - 2))
// 				backoff += backoff * (0.1 * rand.Float64())
// 				select {
// 				case <-ctx.Done():
// 					for _, fq := range failedQueries {
// 						log.Error().Err(ctx.Err()).Uint64("from", fq.FromBlock.Uint64()).Uint64("to", fq.ToBlock.Uint64()).Msg("aborting failed backfill interval")
// 					}
// 					return
// 				case <-time.After(time.Second * time.Duration(backoff)):
// 					continue
// 				}
// 			}
// 		}
// 	}(ch)

// 	return ch, nil
// }

// // HistoricalEventsWithQueryParams queries past blocks for the events emitted by the given contract addresses.
// // These events are provided in a channel and ready to be consumed by the caller.
// // * fromBlock > 0 && numBlocks > 0 => Backfill from fromBlock to fromBlock+numBlocks
// // * fromBlock > 0 && numBlocks = 0 => Backfill from fromBlock to current latest block
// // * fromBlock = 0 && numBlocks > 0 => Backfill last numBlocks blocks
// func HistoricalEventsWithQueryParams(ctx context.Context, client *ethclient.Client, addresses []common.Address, fromBlock uint64, numBlocks uint64) (<-chan types.Log, error) {
// 	switch {
// 	case fromBlock > 0 && numBlocks > 0:
// 		return HistoricalEvents(ctx, client, addresses, fromBlock, fromBlock+numBlocks)
// 	case fromBlock > 0 && numBlocks == 0:
// 		return HistoricalEvents(ctx, client, addresses, fromBlock, 0)
// 	case fromBlock == 0 && numBlocks > 0:
// 		toBlock, err := client.BlockNumber(ctx)
// 		if err != nil {
// 			log.Error().Err(err).Msg("failed to get block number")
// 			ch := make(chan types.Log)
// 			close(ch)
// 			return ch, err
// 		}
// 		return HistoricalEvents(ctx, client, addresses, toBlock-numBlocks, toBlock)
// 	default:
// 		ch := make(chan types.Log)
// 		close(ch)
// 		return ch, nil
// 	}
// }


// // ChunkedFilterLogs queries the blockchain for past events in batches.
// // It slices addresses and total number of blocks with pre-defined batch size.
// // The results are later fed into a log chan that was provided by the caller.
// // Failed query intervals are fed into another channel to allow the caller to retry later.
// func ChunkedFilterLogs(ctx context.Context, client ETHClient, addresses []common.Address, fromBlock, toBlock uint64, logChan chan<- types.Log, failedQueries []ethereum.FilterQuery) ([]ethereum.FilterQuery, error) {
// 	var err error

// 	if failedQueries == nil {
// 		failedQueries = make([]ethereum.FilterQuery, 0)
// 	}

// 	if len(addresses) > addressChunkSize {
// 		failedQueries, err = ChunkedFilterLogs(ctx, client, addresses[:addressChunkSize], fromBlock, toBlock, logChan, failedQueries)
// 		if err != nil {
// 			return nil, err
// 		}
// 		return ChunkedFilterLogs(ctx, client, addresses[addressChunkSize:], fromBlock, toBlock, logChan, failedQueries)
// 	}

// 	if toBlock-fromBlock > blockChunkSize {
// 		failedQueries, err = ChunkedFilterLogs(ctx, client, addresses, toBlock-blockChunkSize, toBlock, logChan, failedQueries)
// 		if err != nil {
// 			return nil, err
// 		}
// 		return ChunkedFilterLogs(ctx, client, addresses, fromBlock, toBlock-blockChunkSize-1, logChan, failedQueries)
// 	}

// 	log.Debug().Uint64("from", fromBlock).Uint64("to", toBlock).Msg("retrieving historical events...")

// 	query := ethereum.FilterQuery{
// 		FromBlock: big.NewInt(int64(fromBlock)),
// 		ToBlock:   big.NewInt(int64(toBlock)),
// 		Addresses: addresses,
// 	}

// 	logs, err := client.FilterLogs(ctx, query)
// 	if err != nil {
// 		if strings.Contains(err.Error(), "read limit") {
// 			// error -> websocket: read limit exceeded

// 			log.Error().Err(err).Msg("hit RPC rate limit")
// 			return nil, err
// 		}
// 		log.Warn().Err(err).Uint64("from", fromBlock).Uint64("to", toBlock).Msg("skipping failed backfill interval...")

// 		// Node providers may refuse the request if they deem it too large.
// 		// It could be block range, number of events or just response size.
// 		// Here, the call is divided into two, so that it can go through.
// 		// If the problem is with some specific block range,
// 		// this will also process the good blocks in a binary search fashion.
// 		mid := (query.FromBlock.Uint64() + query.ToBlock.Uint64()) / 2

// 		q1 := query
// 		q1.ToBlock = big.NewInt(int64(mid))
// 		failedQueries = append(failedQueries, q1)

// 		q2 := query
// 		q2.FromBlock = big.NewInt(int64(mid))
// 		failedQueries = append(failedQueries, q2)
// 	}

// 	for _, l := range logs {
// 		logChan <- l
// 	}

// 	return failedQueries, nil
// }