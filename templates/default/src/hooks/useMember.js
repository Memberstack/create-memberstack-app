import { useMemberstack } from '@memberstack/react';
import { useEffect, useState } from 'react';

function useMember() {
  const memberstack = useMemberstack();
  const [member, setMember] = useState();

  useEffect(() => {
    memberstack
      .getCurrentMember()
      .then(({ data }) => setMember(data))
      .catch(err => console.log(err));
  }, []);

  return member;
}

export default useMember;
