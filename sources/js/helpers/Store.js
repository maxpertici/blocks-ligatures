
// https://github.com/pmndrs/zustand

import { create } from 'zustand' ;

import LocalStorage from "./LocalStorage.js";
const storage = new LocalStorage();

const useBLStore = create( (set) => ( {

    ManagerIsActive          : storage.getManagerIsActive(),
    LigaturesCollection      : window.blocksLigatures.collection,
    LigaturesScope           : [],
    BlocksCapacities         : {},
    BlocksPositions          : [],
    BlocksScrolls            : [],
    EditorScreenIsRunning    : false,
    EditorBlocks             : [],
    EditorLayoutRootTop      : 0,

    setManagerIsActive       : (value) => set( (state) => ( { ManagerIsActive       : value })),
    setLigaturesCollection   : (value) => set( (state) => ( { LigaturesCollection   : value })),
    setLigaturesScope        : (value) => set( (state) => ( { LigaturesScope        : value })),
    setBlocksCapacities      : (value) => set( (state) => ( { BlocksCapacities      : value })),
    setBlocksPositions       : (value) => set( (state) => ( { BlocksPositions       : value })),
    setBlocksScrolls         : (value) => set( (state) => ( { BlocksScrolls         : value })),
    setEditorScreenIsRunning : (value) => set( (state) => ( { EditorScreenIsRunning : value })),
    setEditorBlocks          : (value) => set( (state) => ( { EditorBlocks          : value })),
    setEditorLayoutRootTop   : (value) => set( (state) => ( { EditorLayoutRootTop   : value }))
}))

export { useBLStore } ;