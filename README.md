# "Gieß dein Viertel / Water your quarter"

## Background

Trees in cities are more and more affected by draught.
The GiessDenKiez-project (https://github.com/technologiestiftung/giessdenkiez-de)
has started monitoring the missing water required by trees.
This app should focus on citizen, want to water some trees and need a quick overview,
which trees need to be watered in near my home or near the next public water pump.

## Community

This app is orientated to the GiessDenKiez-project of Berlin.
There is a fork for Leipzig (https://github.com/CodeforLeipzig/tsb-trees-frontend)
which is used as origin of data.

## Technical

### Frameworks
As base of the project, nativescript with angular implementation is used.
Therefore the installation of naticescript have to be followed the official
documentation (linux: https://docs.nativescript.org/start/ns-setup-linux).

### SDK
The base SDK tested for this project is Android 7.0 (API level 24).

### Installation
Run `npm i` to install all dependencies.

### Running & debugging
The file `.env.template` has to be renamed into `.env`. There, the environment variables
need to de defined.

The most useful commands can be found in the `package.json`.
For debugging purposes, `npm run debug:emu` can be used.
