import { UniqueId } from '../../../../../../libs/shared/testing/unique-id';
import { IUserRepository } from '../../../../domain/contracts/repository/user.repository';
import { ICreateUserUseCase } from '../../../../domain/contracts/use-cases/create-user';
import { UserFakerBuilder } from '../../../../domain/user-fake.build';
import { User } from '../../../../domain/user.aggregate';
import { CreateUserUseCase } from '../create-user.use-case';

describe('CreateUserUseCase', () => {
  let sut: ICreateUserUseCase;
  let userRepository: IUserRepository;

  let module: TestingModule;

  const id: string = UniqueId();
  const userCreated: User = UserFakerBuilder.anUser().withId(id).build();

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: ICreateUserUseCase,
          useClass: CreateUserUseCase,
        },
        {
          provide: IUserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(userCreated),
          },
        },
        {
          provide: IIdentityAndAccessService,
          useValue: {
            addUserRole: jest.fn(),
          },
        },
        {
          provide: IEventDispatcher,
          useValue: {
            dispatchEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = await module.resolve(IUserRepository);
    eventDispastcher = await module.resolve(IEventDispatcher);
    identityAndAccessService = await module.resolve(IIdentityAndAccessService);
    sut = await module.resolve(ICreateUserUseCase);
  });

  test('should call [IUserRepository.create] with correct params', async () => {
    await sut.execute({ ...userCreated, id });

    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(userCreated);
  });

  test('should dispatch [UserCreatedEvent] on success', async () => {
    jest.useFakeTimers();

    await sut.execute({ ...userCreated, id });

    expect(eventDispastcher.dispatchEvent).toHaveBeenCalledTimes(1);
    expect(eventDispastcher.dispatchEvent).toHaveBeenCalledWith(
      new UserCreatedEvent(userCreated.id, userCreated),
    );
  });

  test('should rethrow if [IUserRepository.create] throws', async () => {
    const error: Error = new Error('any_ error');
    jest.spyOn(userRepository, 'create').mockRejectedValueOnce(error);

    const promise: Promise<void> = sut.execute({ ...userCreated, id });

    expect(promise).rejects.toThrow(error);
  });

  test('should call [IIdentityAndAccessService] with correct params', async () => {
    await sut.execute({ ...userCreated, id });

    expect(identityAndAccessService.addUserRole).toHaveBeenCalledTimes(1);
    expect(identityAndAccessService.addUserRole).toHaveBeenCalledWith(
      userCreated.id,
      ChecktudoRolesEnum.BASIC,
    );
  });
});
