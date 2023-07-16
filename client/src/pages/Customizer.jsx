import { useState, useEffect } from "react";
import { AnimatePresence, motion }from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import AIPicker from "../components/AIPicker";
import FilePicker from "../components/FilePicker";
import ColorPicker from "../components/ColorPicker";
import CustomButton from "../components/CustomButton"
import Tab from "../components/Tab";

const Customizer = () => {
  const snapshot = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt: true, stylishShirt: false });


  const generateTabContent = () => {
    switch(activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        );
      case "aipicker":
        return <AIPicker />
      default: return null;
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch(tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  };

  return (
    <AnimatePresence>
      {
        (!snapshot.intro) ? (
          <>
            <motion.div
              key="custom"
              className="absolute top-0 left-0 z-10"
              {...slideAnimation("left")}
            >
              <div classNAme="flex items-center min-h-screen">
                <div className="editortabs-container tabs">
                  {
                    EditorTabs.map((tab) => (
                      <Tab
                        key={tab.name}
                        tab={tab}
                        handleClick={() => setActiveEditorTab(tab.name)}
                      />
                    ))
                  }

                  { generateTabContent() }
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute z-10 top-5 right-5"
              {...fadeAnimation}
            >
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => state.intro = true}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>

            <motion.div
              className="filtertabs-container"
              {...slideAnimation("up")}
            >
              {
                FilterTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab=""
                    handleClick={() => {}}
                  />
                ))
              }
            </motion.div>
          </>
        ) : undefined
      }
    </AnimatePresence>
  )
}

export default Customizer

{/* <button className='download-btn' onClick={downloadCanvasToImage}>
  <img
    src={download}
    alt='download_image'
    className='w-3/5 h-3/5 object-contain'
  />
</button> */}