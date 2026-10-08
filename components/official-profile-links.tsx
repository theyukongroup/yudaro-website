import { Fragment } from 'react';
import { officialSocialProfiles } from '@/lib/official-profiles';

export function OfficialProfileLinks({ inline = false }: { inline?: boolean }) {
  return officialSocialProfiles.map(({ name, url }, index) => (
    <Fragment key={url}>
      {inline && index > 0 ? ' · ' : null}
      <a href={url}>Yudaro on {name}</a>
    </Fragment>
  ));
}
