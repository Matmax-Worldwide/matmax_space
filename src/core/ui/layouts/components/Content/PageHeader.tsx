import { ReactNode } from 'react';
import { cn } from '@/src/core/utils/styling';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

type PageHeaderProps = {
  title: string;
  description?: string;
  backButton?: {
    href: string;
    label: string;
  };
  actions?: ReactNode;
  className?: string;
};

/**
 * Page header component
 * Provides consistent styling for page headers with title, description, and actions
 */
export function PageHeader({
  title,
  description,
  backButton,
  actions,
  className
}: PageHeaderProps) {
  return (
    <div className={cn(
      "mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0",
      className
    )}>
      <div>
        {backButton && (
          <Link 
            href={backButton.href}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ChevronLeft size={16} className="mr-1" />
            {backButton.label}
          </Link>
        )}
        
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      
      {actions && (
        <div className="flex flex-shrink-0 space-x-2 mt-4 sm:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader; 