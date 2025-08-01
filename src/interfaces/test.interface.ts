export interface CreateTestInterface {
    title: string;
    description: string;

}

export interface TestInterface extends CreateTestInterface {
    id: number;
    successrate: number;
    timeLimit: number;
    createdBy: number;
}