export interface JwtPayload {
    iat: number;
    exp: number;
    roles: string[];
    username: string; // Ajoutez cette propriété pour correspondre au payload que vous utilisez
}