export interface AddUser {
  userName: string;
  email: string;
  password: string;
  role: number;
}

export interface AddUser {
  userId:number;
  userName: string;
  email: string;
  password: string;
}

export interface Project {
  projectId: number;
  projectName: string;
  projectDescription: string;
  userList: { userId: number; userName: string }[];
}

export interface GetUser {
  userId: number;
  userName: string;
  email: string;
  password: string;
  role: string;
}

export interface Login {
  userName: string;
  password: string;
}

export interface TokenResponse {
  userId: number;
  role: string;
  token: string;
}

export interface AddProject {
  projectName: string;
  projectDescription: string;
  userList: number[];
}

export interface ProjectResponse {
  projectId: number;
  projectName: string;
}

export interface AddBoard {
  boardName: string;
  project: number;
}

export interface EditBoard {
  boardName: string;
  project: number;
}

export interface BoardResponse {
  boardId: number;
  boardName: string;
  projectId:number;
  project: string;
}

export interface AddSprint {
  sprintNo: string;
  sprintName: string;
  sprintPoint: number;
  startDate: Date;
  endDate: Date;
  board: number;
}

export interface EditSprint {
  sprintNo: string;
  sprintName: string;
  sprintPoint: number;
  startDate: Date;
  endDate: Date;
  board: number;
  releaseName:string;
}

export interface SprintResponse {
  sprintId: number;
  sprintNo: string;
  sprintName: string;
  sprintPoint: number;
  startDate: Date;
  endDate: Date;
  boardId:number;
  board: string;
  releaseId: number;
  releaseName: string;
}

export interface AddEpic {
  epicName: string;
  description: string;
  project: number;
}

export interface EpicResponse {
  epicId: number;
  epicName: string;
  description: string;
  projectId:number;
  project: string;
}

export interface AddStory {
  storyName: string;
  description: string;
  storyStatus: number;
  board: number;
  user: number;
  sprint: number;
  epic: number;
}

export interface AddSubTask {
  taskName: string;
  description: string;
  story: number;
}

export interface AddComment {
  comment: string;
  story: number;
}

export interface AddRelease {
  releaseName: string;
  sprint: number;
}

export interface UpdateStoryStatusDTO {
  storyStatusId: number;
}
