#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.."

cd $DIR
yes | rm google-nav.zip
zip -9 -r google-nav.zip google-nav -x *publishing* *.git* *.idea*