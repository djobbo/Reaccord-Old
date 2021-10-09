import { appendChild } from "./appendChild"
import { appendChildToContainer } from "./appendChildToContainer"
import { appendInitialChild } from "./appendInitialChild"
import { clearContainer } from "./clearContainer"
import { commitUpdate } from "./commitUpdate"
import { createInstance } from "./createInstance"
import { createTextInstance } from "./createTextInstance"
import { finalizeInitialChildren } from "./finalizeInitialChildren"
import { getChildHostContext } from "./getChildHostContext"
import { getRootHostContext } from "./getRootHostContext"
import { prepareForCommit } from "./prepareForCommit"
import { prepareUpdate } from "./prepareUpdate"
import { removeChildFromContainer } from "./removeChildFromContainer"
import { resetAfterCommit } from "./resetAfterCommit"
import { shouldSetTextContent } from "./shouldSetTextContent"

export const hostConfig = {
    supportsMutation: true,
    getRootHostContext,
    getChildHostContext,
    prepareForCommit,
    resetAfterCommit,
    shouldSetTextContent,
    createInstance,
    createTextInstance,
    clearContainer,
    finalizeInitialChildren,
    appendInitialChild,
    appendChild,
    appendChildToContainer,
    removeChildFromContainer,
    prepareUpdate,
    commitUpdate,
}
