/*
  Copyright 2020-2022 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import { jest } from '@jest/globals';

import testContext from '../../test/testContext.js';

const lowdefy = {
  _internal: {
    actions: {
      Logout: ({ methods: { logout } }) => {
        return logout();
      },
    },
    auth: {
      logout: jest.fn(),
    },
  },
};

const RealDate = Date;
const mockDate = jest.fn(() => ({ date: 0 }));
mockDate.now = jest.fn(() => 0);

beforeEach(() => {
  global.Date = mockDate;
  lowdefy._internal.auth.logout.mockReset();
});

afterAll(() => {
  global.Date = RealDate;
});

test('Logout', async () => {
  const pageConfig = {
    id: 'root',
    type: 'Box',
    blocks: [
      {
        id: 'button',
        type: 'Button',
        events: {
          onClick: [
            {
              id: 'a',
              type: 'Logout',
            },
          ],
        },
      },
    ],
  };
  const context = await testContext({
    lowdefy,
    pageConfig,
  });
  const button = context._internal.RootBlocks.map['button'];
  const res = await button.triggerEvent({ name: 'onClick' });
  expect(lowdefy._internal.auth.logout.mock.calls).toEqual([[]]);
  expect(res.success).toBe(true);
});