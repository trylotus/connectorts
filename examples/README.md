# Example Connector

Building a connector on lotus is easy, yet the libraries can be overwhelming at the beginning. Here we will walk you through how to create a connector in a few easy steps.

 **It is highly recommended to use example connectors as the template to build your own connector.**

## Connector Structure

Project directory tree is expected to be in such structure.

|-- <project_name>
|   |------- cmd
|            |-------------- <project_name>
|                             |------------- main.ts
|   |------- <project_name>.ts
|   |------- local.yaml
|   |------- manifest.yaml
|   |------- types.ts
|   |------- ...
|   |------- other files as needed
|   |------- ...
|   |------- smart-contracts
|            |-------------- <contract_name>
|                             |------------- <contract_name>_pb.ts
|                             |------------- <contract_name>.abi.json
|                             |------------- <contract_name>.proto
|                             |------------- <contract_name>.proto.desc
|                             |------------- <contract_name>.ts

## Building the Connector

1. Get protocol ABI files

An ABI (Application Binary Interface) file contains all the information on a given smart contract. It can be found on Etherscan by searching the smart contract address. This address can be found on project's website. 

Go to `./smart-contracts/<contract_name>` directory. Copy the ABI from Etherscan and save it in a file named `<contract_name>.abi.json`.


2. Create Protocol Buffer definitions

Next, generate the `<contract_name>.proto` file using `protogen`.
.

```shell
protogen -p <contract_name> -i "./<contract_name>.abi.json" <contract_name>.proto
```

This creates a `.proto` file, which defines the data format for a protobuf message. A `.proto` file can define multiple messages; in our case each message corresponds to a type of event that the smart contract can emit. It should look something like this.

```protobuf
syntax = "proto3";
package lendingpool;

import "google/protobuf/timestamp.proto";

option go_package = "github.com/trylotus/connectorts/examples/aave/lendingpool";

message Borrow {
	google.protobuf.Timestamp ts = 1;
	bytes reserve = 2; 
	bytes user = 3; 
	bytes onBehalfOf = 4; 
	bytes amount = 5; // uint256
	bytes borrowRateMode = 6; // uint256
	bytes borrowRate = 7; // uint256
	uint32 referral = 8; 

    // These properties are added manually to mark an event log with unique identifiers
	uint64 blockNumber = 9;
	uint64 logIndex = 10;
	bytes txHash = 11;

}

message Deposit {
	google.protobuf.Timestamp ts = 1;
	bytes reserve = 2; 
	bytes user = 3; 
	bytes onBehalfOf = 4; 
	bytes amount = 5; // uint256
	uint32 referral = 6; 

    // These properties are added manually to mark an event log with unique identifiers
	uint64 blockNumber = 7;
	uint64 logIndex = 8;
	bytes txHash = 9;
}
```

3. Create adapter file

Go to `smart-contract/<contract-name>` folder. Here you will create adapter file with [buf](https://docs.buf.build/generate/usage#run-generate). You need to have `buf.gen.yaml` configuration file in that folder. Alternatively, you can pass the path to folder with `.proto` files to the command.

```shell
buf generate
```

This adapter file will allow you to create protobuf messages as easy as TypeScript objects.

4. Create event parser

While still inside `./smart-contract/<contract_name> folder create a `<contract_name>.ts` file which will parse incoming event log to protobuf message. Easiest way to create this file is to copy one from examples and use it as template.

5. Create the project-specific files

Now you will create the files to which will contain your connector logic using Lotus connector library. These include all the files in the `<project_name>` directory. You can copy the files from examples as template. 

* `local.yaml`
* `manifest.yaml`
* `types.ts`
* `<project_name>.ts`

`local.yaml`: Configuration file containing the rpc urls which are needed to retrieve data from the
blockchain. You’ll need it to run and test your connector locally.

`manifest.yaml`: Connector metadata such as name, author, version etc… 

`types.ts`: You can store all your constants and protobuf definition mappings in this file. 

`<project_name>.ts`: Connector logic should live in this file. You are highly encouraged to copy one from examples as template. 

6. Create main executable

Lastly, create the `main.ts` file in `<project_name>/cmd/<project_name>/`. This is the main executable which handles starting and running the connector, as well as receiving various CLI flags. Copy the code from examples and update it as needed.

#### Congrats! You just built your first connector.

7. Spin up your environment

You should now be able to run your connector locally. First, make sure your Docker daemon is running. 

Next, Go to the directory where you have the [docker-compose.yml](docker-compose.yml) file and spin up your environment.

```shell
docker compose up -d
```

8. Run connector locally

Now start the connector locally by running the `main.ts` file directly from the connector directory.

```shell
cd <connectorname> # eg. cd examples/ethereum
ts-node cmd/<project_name/main.ts
```

If your connector is functioning correctly, you should see event logs being printed to console. That means, protobuf messages are pushed to Kafka successfully. 

Next, check that your connector is receiving live events. Leave your connector running, go back to the webpage on the blockchain explorer for your smart contract, and navigate to the **Events** tab. It lists live events as they come in. You can compare the events on Etherscan with the ones written to Kafka.
