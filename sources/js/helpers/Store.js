
// https://github.com/pmndrs/zustand

import { create } from 'zustand' ;

import LocalStorage from "./LocalStorage.js";
const storage = new LocalStorage();

const useBLStore = create( (set) => ( {

    ManagerIsActive                : storage.getManagerIsActive(),
    LigaturesCollection            : window.blocksLigatures.collection,
    LigaturesScope                 : [],
    BlocksCapacities               : {},
    BlocksPositions                : [],
    EditorHelperScreenIsRunning    : false,
    EditorHelperBlocks             : [],

    setManagerIsActive             : (value) => set( (state) => ( { ManagerIsActive             : value })),
    setLigaturesCollection         : (value) => set( (state) => ( { LigaturesCollection         : value })),
    setLigaturesScope              : (value) => set( (state) => ( { LigaturesScope              : value })),
    setBlocksCapacities            : (value) => set( (state) => ( { BlocksCapacities            : value })),
    setBlocksPositions             : (value) => set( (state) => ( { BlocksPositions             : value })),
    setEditorHelperScreenIsRunning : (value) => set( (state) => ( { EditorHelperScreenIsRunning : value })),
    setEditorHelperBlocks          : (value) => set( (state) => ( { EditorHelperBlocks          : value }))
}))

export { useBLStore } ;