export type CommandResult<State> = {
  success: boolean;
  newState?: State;
  error?: string;
  message?: string;
};

export interface ICommand<State> {
  execute(state: State): CommandResult<State>;
}

export abstract class BaseCommand<State> implements ICommand<State> {
  abstract execute(state: State): CommandResult<State>;

  protected createSuccessResult(
    newState: State,
    message?: string
  ): CommandResult<State> {
    return {
      success: true,
      newState,
      message,
    };
  }

  protected createErrorResult(error: string): CommandResult<State> {
    return {
      success: false,
      error,
    };
  }

  protected createUnchangedResult(): CommandResult<State> {
    return {
      success: false,
    };
  }
}
