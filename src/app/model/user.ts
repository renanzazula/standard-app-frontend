import { Authority } from './authority';

export class User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  authorities: Authority[];
}
