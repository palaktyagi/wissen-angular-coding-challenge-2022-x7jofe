import { Component, OnInit } from "@angular/core";
import { catchError, filter, map, pluck } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { User } from "../types/user.type";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  users: User[]; // type this variable using user.type.ts file
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsersList().pipe(
      map((res: any) => res.data),
      catchError((err) => {
        console.log(err);
        // Show error message on UI
        return undefined;
      }),
      filter((res) => !!res)
    ).subscribe(res => {
      this.users = res;
      console.log(this.users);
    })
  }

  ngOnDestroy() {}
}