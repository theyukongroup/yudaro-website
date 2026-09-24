export type VerifiedPerson = {
  name: string;
  profileUrl: string;
  role: string;
  verifiedOn: string;
};
// Add a real person only after identity, role and public profile are approved.
// Empty by design: no fictional author or reviewer appears on the site.
export const verifiedPeople: Record<string, VerifiedPerson> = {};
