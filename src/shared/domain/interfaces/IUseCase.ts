export interface IUseCase<IRequest, IResponse> {
    execute(req: IRequest): Promise<IResponse> | IResponse;
}
