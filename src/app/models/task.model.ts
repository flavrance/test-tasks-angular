export class Task {
    id?: any;
    description?: string;
    date?: Date;
    status?: TaskStatusEnum;
}
 export enum TaskStatusEnum {
    CREATE = 1,
    CREATED = 2,
    PENDING = 3,
    IN_PROGRESS = 4,    
    COMPLETED = 5,
    DONE = 6
 }

 export const TaskStatus2LabelMapping: Record<TaskStatusEnum, string> = {
    [TaskStatusEnum.CREATE]: "Criar",
    [TaskStatusEnum.CREATED]: "Criado",
    [TaskStatusEnum.PENDING]: "Pendente",
    [TaskStatusEnum.IN_PROGRESS]: "Em Progresso",
    [TaskStatusEnum.COMPLETED]: "Completado",
    [TaskStatusEnum.DONE]: "Feito",
};