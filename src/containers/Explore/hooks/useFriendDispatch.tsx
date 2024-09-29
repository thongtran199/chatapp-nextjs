import { useDispatch } from '@/lib/redux';

const useFriendshipDispatch = () => {
  const dispatch = useDispatch();

  const executeAction = async (
    mainAction: any,
    mainPayload: any,
    extraAction: any,
  ) => {
    const resultAction = await dispatch(mainAction(mainPayload));
    if (mainAction.fulfilled.match(resultAction)) {
      extraAction();
    }
  };

  return { executeAction };
};

export default useFriendshipDispatch;
