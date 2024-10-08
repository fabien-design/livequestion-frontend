import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib'
import { getUserDetail } from '@/features/query/user.query'
import { getUserSession } from './app/(home)/action'

// Liste des routes protégées et publiques
const protectedRoutes = ['/questions', '/question', '/profile', '/users'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Vérifie si le chemin est une route protégée ou publique
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  // Récupère la session utilisateur
  const user = await getUserSession();

  if (!user && isProtectedRoute) {
    const callbackUrl = req.nextUrl.href;
    return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, req.nextUrl));
  }

  if (user) {
    const userDetails = await getUserDetail(user.username);

    // Si l'utilisateur est connecté mais n'a pas les détails, rediriger vers la page de login
    if (isProtectedRoute && !userDetails?.id) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  // Continue la requête
  return NextResponse.next();
}

// Routes à exclure du Middleware
