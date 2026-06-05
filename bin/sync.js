#!/usr/bin/env node
'use strict';

/**
 * horus-spec-driven sync — convenience wrapper
 *
 * Same as `horus-spec-driven install --no-vendor-pull` except it always pulls the
 * latest gsd-core from GitHub. For "I just want to update everything" use
 * case.
 *
 * For more granular control, use bin/install.js directly:
 *   horus-spec-driven install --version=v1.3.0 --runtime=hermes --global
 *   horus-spec-driven install --no-vendor-pull --runtime=claude --local
 */

require('./install.js');
