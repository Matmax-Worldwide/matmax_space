import { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        setUserEmail(user.email);
      }
    };
    
    fetchUser();
  }, []);
  
  // Handle clicking outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle sign out
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/sign-in');
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border overflow-hidden z-50">
          <div className="p-2">
            <div className="px-4 py-2 text-sm border-b border-border">
              <p className="font-medium">Account</p>
              <p className="text-muted-foreground truncate">{userEmail || 'User'}</p>
            </div>
            
            <div className="mt-2">
              <button 
                className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to profile page when available
                }}
              >
                <User size={16} className="mr-2" />
                Profile
              </button>
              
              <button 
                className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to settings page when available
                }}
              >
                <Settings size={16} className="mr-2" />
                Settings
              </button>
              
              <button 
                className="w-full flex items-center px-4 py-2 text-sm hover:bg-muted rounded-md text-error"
                onClick={handleSignOut}
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 