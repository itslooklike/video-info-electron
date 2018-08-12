import { ipcRenderer as ipc } from 'electron';

import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE,
} from './types';

export const addVideos = (videos) => (dispatch) => {
  ipc.send('videos:added', videos);
  ipc.on('metadata:complete', (event, videosWithData) => {
    dispatch({ type: ADD_VIDEOS, payload: videosWithData });
  });
};

export const convertVideos = () => (dispatch, state) => {
  ipc.send('conversion:start', Object.values(state().videos));
  ipc.on('conversion:end', (event, { video, outputPath }) =>
    dispatch({ type: VIDEO_COMPLETE, payload: { ...video, outputPath } })
  );
  ipc.on('conversion:progress', (event, { video, timemark }) =>
    dispatch({ type: VIDEO_PROGRESS, payload: { ...video, timemark } })
  );
};

export const showInFolder = (outputPath) => (dispatch) => {
  ipc.send('folder:open', outputPath);
};

export const addVideo = (video) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video },
  };
};

export const setFormat = (video, format) => {
  return {
    type: ADD_VIDEO,
    payload: { ...video, format, err: '' },
  };
};

export const removeVideo = (video) => {
  return {
    type: REMOVE_VIDEO,
    payload: video,
  };
};

export const removeAllVideos = () => {
  return {
    type: REMOVE_ALL_VIDEOS,
  };
};
