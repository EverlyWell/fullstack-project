import React, { useState, useEffect, useCallback } from "react";
import { Photo } from "./HomePage";
import { CircularProgress } from "@material-ui/core";

interface Props {
  photos: Photo[];
  loading: boolean;
}
export const PhotoGrid = ({ photos, loading }: Props) => {
  if (loading) return <CircularProgress />;
  if (!photos.length)
    return <div> type in a search phrase to see cat photos </div>;
  return (
    <div>
      Here are your pictures:
      {photos.map((photo) => (
        <img key={photo.id} src={photo.url} />
      ))}
    </div>
  );
};
