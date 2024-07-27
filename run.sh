#!/bin/bash -e

pushd ./drizzle/migrate
bun db:migrate
popd 

bun start
