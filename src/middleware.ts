import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAccessingCrm = req.nextUrl.pathname.startsWith('/crm');
  const isAccessingUsersPage = req.nextUrl.pathname.startsWith('/crm/users');

  if (!session && isAccessingCrm) {
    return NextResponse.redirect(new URL('/login_crm', req.url));
  }

  if (session && isAccessingUsersPage) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (userData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/crm', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/crm/:path*'],
};