import NavbarItemsCategories from './NavbarItemsCategories';
import NavbarReactIcons from '@/components/NavbarReactIcons';
import { getCurrentUser } from '@/lib/current_user';

export default async function Navbar() {
    const user = await getCurrentUser();

    return (
        <nav className="navbar">
            <NavbarItemsCategories />
            <NavbarReactIcons user={user} />
        </nav>
    )
}
