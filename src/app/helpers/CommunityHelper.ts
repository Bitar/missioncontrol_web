export const communityAccessType = (accessType: number) => {
  let text = "";
  let color = "";

  if (accessType === 1) {
    color = "success";
    text = "Public";
  } else if (accessType === 2) {
    color = "danger";
    text = "Private";
  } else {
    color = "secondary";
    text = "Unknown";
  }

  return { color, text };
};

export const communityStatus = (status: number) => {
  let text = "";
  let color = "";

  if (status === 1) {
    color = "secondary";
    text = "Pending";
  } else if (status === 2) {
    color = "success";
    text = "Active";
  } else {
    color = "danger";
    text = "Closed";
  }

  return { color, text };
};

export const formatCommunitySubscriptionStatus = (statusId: number) => {
  let color: string;
  let status: string;

  if (statusId === 1) {
    status = "Incomplete";
    color = "danger";
  } else if (statusId === 2) {
    status = "Incomplete Expired";
    color = "danger";
  } else if (statusId === 3) {
    status = "Trialing";
    color = "secondary";
  } else if (statusId === 4) {
    status = "Active";
    color = "success";
  } else if (statusId === 5) {
    status = "Past Due";
    color = "danger";
  } else if (statusId === 6) {
    status = "Canceled";
    color = "danger";
  } else if (statusId === 7) {
    status = "Unpaid";
    color = "danger";
  } else {
    status = "Unknown";
    color = "danger";
  }

  return { status, color };
};
