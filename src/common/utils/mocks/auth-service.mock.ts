export const authServiceMock = () => ({
    collectionGetQuery: jest.fn(),
    hello: jest.fn(),
  });

  export const userServiceMock = () => ({
    collectionGetQuery: jest.fn(),
    findUser : jest.fn(),
  });