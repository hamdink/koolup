export class RegisterUserDto {
  prenom: string;
  nom: string;
  téléphone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string; // Ajoutez la propriété 'role' ici

  constructor(prenom: string, nom: string, email: string, password: string, téléphone: string, confirmPassword: string) {
    this.prenom = prenom;
    this.nom = nom;
    this.téléphone = téléphone;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = 'consommateur'; // Initialisez le rôle par défaut
  }
}


