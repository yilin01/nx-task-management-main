import { Test } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const mockCredentialsDto = {
  username: 'TestUsername',
  password: 'TestPassword',
};

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('UsersRepository', () => {
  let usersRepository;
  let createSpy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersRepository],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('createUser', () => {
    beforeEach(() => {
      usersRepository.create = jest.fn();
      usersRepository.save = jest.fn();
      usersRepository.create.mockResolvedValue(mockUser);
    });

    it('successfully signs up the user', async () => {
      usersRepository.save.mockResolvedValue(null);
      const res = await usersRepository.createUser(mockCredentialsDto);
      expect(res).toBeUndefined();
      expect(usersRepository.create).toHaveBeenCalled();
      expect(usersRepository.save).toHaveBeenCalled();
    });

    it('throws a conflict exception as username already exists', async () => {
      usersRepository.save.mockRejectedValue({ code: '23505' });
      //const res = await usersRepository.createUser(mockCredentialsDto);
      //console.log(res);
      await expect(usersRepository.createUser(mockCredentialsDto)).rejects.toThrow(
        ConflictException
      );
    });

    it('throws a internal exception if other error occurs', async () => {
      usersRepository.save.mockRejectedValue({ code: '123123' }); // unhandled error code
      await expect(usersRepository.createUser(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  // describe('validateUserPassword', () => {
  //   let user;

  //   beforeEach(() => {
  //     UsersRepository.findOne = jest.fn();
  //     user = new User();
  //     user.username = 'TestUsername';
  //     user.validatePassword = jest.fn();
  //   });

  //   it('returns the username as validation is successful', async () => {
  //     UsersRepository.findOne.mockResolvedValue(user);
  //     user.validatePassword.mockResolvedValue(true);

  //     const result = await UsersRepository.validateUserPassword(mockCredentialsDto);
  //     expect(result).toEqual('TestUsername');
  //   });

  //   it('returns null as user cannot be found', async () => {
  //     UsersRepository.findOne.mockResolvedValue(null);
  //     const result = await UsersRepository.validateUserPassword(mockCredentialsDto);
  //     expect(user.validatePassword).not.toHaveBeenCalled();
  //     expect(result).toBeNull();
  //   });

  //   it('returns null as password is invalid', async () => {
  //     UsersRepository.findOne.mockResolvedValue(user);
  //     user.validatePassword.mockResolvedValue(false);
  //     const result = await UsersRepository.validateUserPassword(mockCredentialsDto);
  //     expect(user.validatePassword).toHaveBeenCalled();
  //     expect(result).toBeNull();
  //   });
  // });

  // describe('hashPassword', () => {
  //   it('calls bcrypt.hash to generate a hash', async () => {
  //     bcrypt.hash = jest.fn().mockResolvedValue('testHash');
  //     expect(bcrypt.hash).not.toHaveBeenCalled();
  //     const result = await UsersRepository.hashPassword('testPassword', 'testSalt');
  //     expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
  //     expect(result).toEqual('testHash');
  //   });
  // });
});
