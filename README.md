<div align="center">
<a href="https://nakji.network"><img alt="Nakji" src="https://github.com/nakji-network/landing/raw/master/src/images/logo.svg" width="300" /></a>
<br/>
<strong></strong>
<h1>Nakji Connector SDK (Typescript)</h1>
</div>
<p align="center">
<a href="https://github.com/nakji-network/connector/actions/workflows/go.yml"><img alt="Github Workflow" src="https://github.com/nakji-network/connector/actions/workflows/go.yml/badge.svg" /></a>
<a href="https://godoc.org/github.com/nakji-network/connectorjs"><img alt="GoDoc" src="https://godoc.org/github.com/nakji-network/connectorjs?status.svg" /></a>
<a href="https://goreportcard.com/report/github.com/nakji-network/connectorjs"><img alt="Typescript Report Card" src="https://goreportcard.com/badge/github.com/nakji-network/connectorjs" /></a>
</p>

# ConnectorTS

ConnectorTS allows building connectors running on nakji network using TypeScript. A connector is a piece of software that either extracts blockchain data and transforms them to Protocol Buffer type and pushes them, or directly listens to messages from nakji network. 

## Table of Contents
 
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with connectorTS, you can follow these steps:

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js (version 18 or higher)
- Typescript (version 4 or higher)
- ts-node (version 10 or higher)
- protoc (version 3 or higher)
- buf
- Docker
- docker-compose

### Installing

1. Add this library to your project:

`npm -i connectorts`

2. Install the required dependencies:

`npm install`

## Usage

Below you can find source connector examples running on Ethereum.

- [Aave](/examples/aave): Connector for Aave protocol
- [Ethereum](/examples/ethereum/): Connector for blockchain-specific events such as block data and transactions

## Contributing

Read our [Contribution Guide](CONTRIBUTING.md)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE.md](LICENSE.md) file for details.