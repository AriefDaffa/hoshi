import type { FC } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { uppercaseLetter } from '@/utils/uppercaseLetter';
import { kebabToNormal } from '@/utils/kebabToNormal';

interface AnimeDetailBreadcrumbProps {
  id: string;
}

const AnimeDetailBreadcrumb: FC<AnimeDetailBreadcrumbProps> = ({ id = '' }) => {
  return (
    <Breadcrumb className="mt-4 px-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/search">Search</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{uppercaseLetter(kebabToNormal(id))}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AnimeDetailBreadcrumb;
