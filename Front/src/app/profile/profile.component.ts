// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any; // Adjust the type based on your user data structure

  constructor(private userService: UserService) {}

 ngOnInit(): void {
  // Assuming you have the user's identifier (replace 'user_id_or_username' with the actual identifier)
  const userIdentifier = 'user_id_or_username';

  this.userService.getSingleUser(userIdentifier).subscribe(
    (profile) => {
      this.userProfile = profile;
    },
    (error) => {
      console.error('Error fetching user profile:', error);
    }
  );
}

}
