# Aldra | Sanity Studio Web

[![semantic-release: conventionalcommits](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Description

An instance of Sanity Studio for content management.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine

#### Running application locally on a host machine

- Install dependencies by running `npm ci`
- Run the following command:
  - `npm start` to start local development server

## Environment Variables

- `NODE_ENV` - current environment
  - `development`
  - `production`
- `SANITY_STUDIO_PROJECT_ID` - Sanity Studio project ID
- `SANITY_STUDIO_DATASET` - Sanity Studio dataset

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:
  - Create a new branch from the `master` branch
  - Implement and commit changes
  - Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:
  - Stage files to be committed
  - Run `npm run commit` script

Avoid using `--no-verify` flag when making commits.
