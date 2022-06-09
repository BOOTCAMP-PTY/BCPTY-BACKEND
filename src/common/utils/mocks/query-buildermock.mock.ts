  export const createQueryBuilderMock = () => ({
    delete: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockReturnThis(),
    orderBy : jest.fn().mockReturnThis(),
    take : () => ({
       skip: (cnt) => ({
         skip: cnt
       }), 
    })
  });