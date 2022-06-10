export const mockedUserService = {
  findUser: jest.fn(),
};

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const user : Partial<any> = { uuid:'a', email: 'agmi@gmail.com'};
