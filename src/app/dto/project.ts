export interface AddUser {
  userName: string;
  email: string;
  password: string;
  role: number;
}

export interface UserResponse {
  userId: number;
  userName: string;
  email: string;
  role: RoleResponse;
}
export interface UpdateUser {
  userName: string;
  email: string;
}

export interface ChangePassword{
  currentPassword:string;
  newPassword:string;
}

export interface RoleResponse {
  id: number;
  title: string;
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

export interface ProjectNamesResponse {
  projectId: number;
  projectName: string;
}

export interface ProjectResponse {
  projectId: number;
  projectName: string;
  projectDescription: string;
  boardList: ProjectBoardResponse[];
  epicList: ProjectEpicsResponse[];
  userList: ProjectUsersResponse[];
}

export interface ProjectBoardResponse {
  boardId: number;
  boardName: string;
  sprintList: ProjectBoardSprintsResponse[];
}

export interface ProjectBoardSprintsResponse {
  sprintId: number;
  sprintName: string;
}

export interface ProjectEpicsResponse {
  epicId: number;
  epicName: string;
}

export interface ProjectUsersResponse {
  userId: number;
  userName: string;
}

export interface AddBoard {
  boardName: string;
  project: number;
}

export interface BoardResponse {
  boardId: number;
  boardName: string;
  project: ProjectNamesResponse;
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
  releaseName: string;
}

export interface SprintResponse {
  sprintId: number;
  sprintNo: string;
  sprintName: string;
  sprintPoint: number;
  startDate: Date;
  endDate: Date;
  board: BoardNameResponse;
  release: ReleaseNameResponse;
}

export interface BoardNameResponse {
  boardId: number;
  boardName: string;
}

export interface AddRelease {
  releaseName: string;
  sprint: number;
}

export interface ReleaseNameResponse {
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
  projectId: number;
  project: ProjectNamesResponse;
}

export interface AddSubTask {
  taskName: string;
  description: string;
  story: number;
}

export interface SubTaskResponse {
  taskId: number;
  taskName: string;
  description: string;
  story: StoryNameResponse;
}

export interface StoryNameResponse {
  storyId: number;
  storyName: string;
}

export interface AddStory {
  storyName: string;
  description: string;
  storyStatus: number;
  board: number;
  user: number;
  sprint: number;
  epic: number;
  assignedTo:number;
}

export interface StoryResponse {
  storyId: number;
  storyName: string;
  description: string;
  storyStatus: StoryStatusResponse;
  board: BoardNameResponse;
  user: ProjectUsersResponse;
  sprint: ProjectBoardSprintsResponse;
  epic: ProjectEpicsResponse;
  assignedTo:ProjectUsersResponse;
}

export interface StoryCategories {
  ToDo: StoryResponse[];
  Done: StoryResponse[];
  InProgress: StoryResponse[];
  Blocked: StoryResponse[];
}

export interface StoryStatusResponse {
  id: number;
  name: string;
}

export interface AddComment {
  comment: string;
  story: number;
}

export interface CommentResponse {
  commentId: number;
  comment: string;
  story: StoryNameResponse;
}

export interface UpdateStoryStatusDTO {
  storyStatusId: number;
}
