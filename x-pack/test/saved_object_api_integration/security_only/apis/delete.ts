/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { AUTHENTICATION } from '../../common/lib/authentication';
import { TestInvoker } from '../../common/lib/types';
import { deleteTestSuiteFactory } from '../../common/suites/delete';

// eslint-disable-next-line import/no-default-export
export default function({ getService }: TestInvoker) {
  const supertest = getService('supertestWithoutAuth');
  const esArchiver = getService('esArchiver');

  describe('delete', () => {
    const {
      createExpectUnknownDocNotFound,
      deleteTest,
      expectEmpty,
      expectRbacSpaceAwareForbidden,
      expectRbacNotSpaceAwareForbidden,
      expectRbacInvalidIdForbidden,
    } = deleteTestSuiteFactory(esArchiver, supertest);

    deleteTest(`user with no access`, {
      user: AUTHENTICATION.NOT_A_KIBANA_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`superuser`, {
      user: AUTHENTICATION.SUPERUSER,
      tests: {
        spaceAware: {
          statusCode: 200,
          response: expectEmpty,
        },
        notSpaceAware: {
          statusCode: 200,
          response: expectEmpty,
        },
        invalidId: {
          statusCode: 404,
          response: createExpectUnknownDocNotFound(),
        },
      },
    });

    deleteTest(`legacy user`, {
      user: AUTHENTICATION.KIBANA_LEGACY_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`dual-privileges user`, {
      user: AUTHENTICATION.KIBANA_DUAL_PRIVILEGES_USER,
      tests: {
        spaceAware: {
          statusCode: 200,
          response: expectEmpty,
        },
        notSpaceAware: {
          statusCode: 200,
          response: expectEmpty,
        },
        invalidId: {
          statusCode: 404,
          response: createExpectUnknownDocNotFound(),
        },
      },
    });

    deleteTest(`dual-privileges readonly user`, {
      user: AUTHENTICATION.KIBANA_DUAL_PRIVILEGES_DASHBOARD_ONLY_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`rbac user with all globally`, {
      user: AUTHENTICATION.KIBANA_RBAC_USER,
      tests: {
        spaceAware: {
          statusCode: 200,
          response: expectEmpty,
        },
        notSpaceAware: {
          statusCode: 200,
          response: expectEmpty,
        },
        invalidId: {
          statusCode: 404,
          response: createExpectUnknownDocNotFound(),
        },
      },
    });

    deleteTest(`rbac user with read globally`, {
      user: AUTHENTICATION.KIBANA_RBAC_DASHBOARD_ONLY_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`rbac user with all at default space`, {
      user: AUTHENTICATION.KIBANA_RBAC_DEFAULT_SPACE_ALL_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`rbac user with read at default space`, {
      user: AUTHENTICATION.KIBANA_RBAC_DEFAULT_SPACE_READ_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`rbac user with all at space_1`, {
      user: AUTHENTICATION.KIBANA_RBAC_SPACE_1_ALL_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });

    deleteTest(`rbac user with readonly at space_1`, {
      user: AUTHENTICATION.KIBANA_RBAC_SPACE_1_READ_USER,
      tests: {
        spaceAware: {
          statusCode: 403,
          response: expectRbacSpaceAwareForbidden,
        },
        notSpaceAware: {
          statusCode: 403,
          response: expectRbacNotSpaceAwareForbidden,
        },
        invalidId: {
          statusCode: 403,
          response: expectRbacInvalidIdForbidden,
        },
      },
    });
  });
}
