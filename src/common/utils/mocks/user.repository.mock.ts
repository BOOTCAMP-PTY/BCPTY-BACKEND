export const mockedUserRepository = {
  createQueryBuilder: jest.fn(() => ({
    getOne: jest.fn(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    orWhere: jest.fn().mockReturnThis(),
  })),
};
