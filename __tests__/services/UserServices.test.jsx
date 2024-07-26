import { describe, expect, test, vi } from 'vitest'
import { fetchUserDetails } from '../../src/services/userService'

// eslint-disable-next-line no-undef
global.fetch = vi.fn()

const createFetchResponse = (data) => {
  return {
    json: () => new Promise((resolve) => resolve(data))
  }
}

describe('Fetch User Details', () => {
  test('should return user details', async () => {
    const mockAuthUser = {
      email: 'test@user.com',
      nickname: 'test',
      sub: 'abc|123'
    }

    const mockUser = {
      nickname: 'test',
      email: 'test@user.com',
      userId: '123'
    }

    fetch.mockResolvedValue(createFetchResponse(mockUser))

    const user = await fetchUserDetails('token', mockAuthUser)

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/users', {
      headers: {
        Authorization: `Bearer token`,
        'X-User-Info': JSON.stringify(mockAuthUser)
      }
    })
    expect(user).toEqual(mockUser)
  })
})
