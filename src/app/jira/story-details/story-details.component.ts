import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StoryService } from 'src/app/story.service';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css'],
})
export class StoryDetailsComponent implements OnInit {
  story: any = null;
  commentForm!: FormGroup;
  newComment = '';
  newSubTask='';
  comments: any = [];
  subTasks:any = [];
  constructor(
    // private fb: FormBuilder,
    public dialogRef: MatDialogRef<StoryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storyService: StoryService
  ) {
    console.log(this.data.id);
    
    this.getStories(this.data.id)
    this.fetchComments(this.data.id);
    this.fetchSubTask(this.data.id);
  }

  ngOnInit(): void {
  }


  getStories(id:number){
    this.storyService.getStoryDetailsById(id).subscribe((data) => {
      this.story = data;
    });
  }


  fetchComments(id: number) {
    this.storyService.getAllCommentByStoryId(id).subscribe((data) => {
      this.comments = data;
    });
  }

  
  fetchSubTask(id: number) {
    this.storyService.getAllSubTaskByStoryId(id).subscribe((data) => {
      this.subTasks = data;
    });
  }


  AddComment(comment: string) {
    const newComment = { comment: comment, story: this.data.id };
    this.storyService.addComment(newComment).subscribe(() => {
      this.fetchComments(this.data.id);
    });
  }

  AddSubTask(subTask: string) {
    const newComment = { taskName: subTask, description:"this is a sub task", story: this.data.id };
    this.storyService.addSubTask(newComment).subscribe(() => {
      this.fetchSubTask(this.data.id);
    });
  }

  deleteComment(id: number) {
    this.storyService.deleteComment(id).subscribe(() => {
      this.fetchComments(this.data.id);
    });
  }
}
