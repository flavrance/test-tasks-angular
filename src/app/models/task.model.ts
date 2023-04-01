export interface Task {
    taskId?: any;
    description?: string;
    date?: string;
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

let mapEnum2LabelMapping : Map<string, string> = new Map<string,string>(); 

for (const [key, value] of Object.entries(TaskStatus2LabelMapping)) {
    mapEnum2LabelMapping.set(key, value);
}   

export const enum2LabelMapping = mapEnum2LabelMapping;