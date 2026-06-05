#!/usr/bin/env node
'use strict';

/**
 * spec-horus sync — convenience wrapper
 *
 * Same as `spec-horus install --no-vendor-pull` except it always pulls the
 * latest gsd-core from GitHub. For "I just want to update everything" use
 * case.
 *
 * For more granular control, use bin/install.js directly:
 *   spec-horus install --version=v1.3.0 --runtime=hermes --global
 *   spec-horus install --no-vendor-pull --runtime=claude --local
 */

require('./install.js');
