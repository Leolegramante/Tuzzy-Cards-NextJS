import {getSession} from "@/helpers/session";
import {NextRequest, NextResponse} from "next/server";

const publicRoutes = ['/', '/about', '/contact', '/auth/sign-in', '/auth/sign-up', '/products', '/checkout'];
const authRoutes = ['/auth/sign-in', '/auth/sign-up']; // Páginas de autenticação
const roleBasedRoutes = {
    ADMIN: [], // Admin tem acesso a todas as páginas
    EDITOR: ['/editor', '/editor/:id', '/dashboard', '/profile', '/settings'], // Editor pode ver as rotas de usuário e editor dinâmico
    SELLER: ['/seller', '/dashboard', '/profile', '/settings', '/editor', '/editor/:id'], // Seller pode ver as mesmas rotas de usuários e editores
    USER: ['/profile', '/settings'],
};

export default async function middleware(req: NextRequest) {
    const session = await getSession();
    const pathname = req.nextUrl.pathname;

    // Impedir usuários autenticados de acessar páginas de login e cadastro
    if (session && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Permitir acesso a páginas públicas e rotas dinâmicas públicas
    const isPublicRoute =
        publicRoutes.includes(pathname) || // rotas estáticas
        /^\/product\/details\/[^/]+$/.test(pathname); // rota dinâmica pública como `/product/details/alguma-coisa`

    if (isPublicRoute) {
        return NextResponse.next(); // Permite acesso
    }

    // Se não for uma rota publica, segue a logica a seguir
    // Se não houver token, redirecionar para login.
    if (!session) {
        return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    const userRole = session.role

    // Se for administrador, permitir acesso a qualquer página
    if (userRole === 'ADMIN') {
        return NextResponse.next();
    }

    for (const [role, paths] of Object.entries(roleBasedRoutes)) {
        if (paths && paths.some(path => {
            const regexPath = new RegExp(`^${path.replace(/:\w+/g, '[^/]+')}$`);
            return regexPath.test(pathname);
        }) && userRole === role) {
            return NextResponse.next();
        }
    }

    // Se não tiver permissão, redireciona para página de acesso negado
    return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/((?!api|_next/static|_next/image|assets|favicon.ico).*)', '/((?!api|_next/static|_next/image|assets|background|favicon.ico).*)', '/((?!api|_next/static|_next/image|assets|logo|favicon.ico).*)'],
};
