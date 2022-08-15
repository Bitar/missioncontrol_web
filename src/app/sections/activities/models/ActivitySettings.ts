export type ActivitySettings = {
  rounds: number,
  is_cross_play: boolean
}

export const initialActivitySettings = (activitySettings?: ActivitySettings) => {
  return {
    rounds: activitySettings?.rounds || 0,
    is_cross_play: activitySettings?.is_cross_play || false
  };
};