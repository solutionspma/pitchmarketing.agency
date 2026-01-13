"use client";

import { useState, useRef, DragEvent } from "react";

// Element types for the CMS
const ELEMENT_TYPES = {
  HEADING: "heading",
  TEXT: "text",
  BUTTON: "button",
  IMAGE: "image",
  CONTAINER: "container",
  DIVIDER: "divider",
};

interface CMSElement {
  id: string;
  type: string;
  content: string;
  children?: CMSElement[];
  styles: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    border?: string;
    width?: string;
    height?: string;
    boxShadow?: string;
    opacity?: number;
  };
}

interface Page {
  id: string;
  name: string;
  slug: string;
  elements: CMSElement[];
}

export default function CMSStudioPage() {
  return <CMSStudio />;
}

function CMSStudio() {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", name: "Home", slug: "/", elements: [] },
    { id: "2", name: "About", slug: "/about", elements: [] },
    { id: "3", name: "Services", slug: "/services", elements: [] },
  ]);
  const [activePage, setActivePage] = useState<Page>(pages[0]);
  const [selectedElement, setSelectedElement] = useState<CMSElement | null>(null);
  const [activeTab, setActiveTab] = useState<"pages" | "elements" | "layers">("elements");

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Create new element
  const createElement = (type: string): CMSElement => {
    const baseElement = {
      id: generateId(),
      type,
      styles: {
        padding: "10px",
        margin: "10px",
      },
    };

    switch (type) {
      case ELEMENT_TYPES.HEADING:
        return { ...baseElement, content: "New Heading", styles: { ...baseElement.styles, fontSize: "24px", fontWeight: "bold" } };
      case ELEMENT_TYPES.TEXT:
        return { ...baseElement, content: "New paragraph text", styles: { ...baseElement.styles, fontSize: "16px" } };
      case ELEMENT_TYPES.BUTTON:
        return { ...baseElement, content: "Click Me", styles: { ...baseElement.styles, backgroundColor: "#2563eb", color: "#ffffff", padding: "10px 20px", borderRadius: "8px" } };
      case ELEMENT_TYPES.IMAGE:
        return { ...baseElement, content: "https://via.placeholder.com/400x200", styles: { ...baseElement.styles, width: "100%", height: "auto" } };
      case ELEMENT_TYPES.CONTAINER:
        return { ...baseElement, content: "", children: [], styles: { ...baseElement.styles, backgroundColor: "#1a1a1a", padding: "20px", borderRadius: "8px", border: "1px solid #333" } };
      case ELEMENT_TYPES.DIVIDER:
        return { ...baseElement, content: "", styles: { ...baseElement.styles, height: "1px", backgroundColor: "#333", margin: "20px 0" } };
      default:
        return { ...baseElement, content: "" };
    }
  };

  // Add element to canvas
  const addElement = (type: string, parentId?: string) => {
    const newElement = createElement(type);
    
    setActivePage((prev) => {
      if (parentId) {
        // Add to container
        const updateChildren = (elements: CMSElement[]): CMSElement[] => {
          return elements.map((el) => {
            if (el.id === parentId) {
              return { ...el, children: [...(el.children || []), newElement] };
            }
            if (el.children) {
              return { ...el, children: updateChildren(el.children) };
            }
            return el;
          });
        };
        return { ...prev, elements: updateChildren(prev.elements) };
      }
      return { ...prev, elements: [...prev.elements, newElement] };
    });

    // Update pages array
    setPages((prev) =>
      prev.map((p) => (p.id === activePage.id ? { ...activePage, elements: [...activePage.elements, newElement] } : p))
    );
  };

  // Update element
  const updateElement = (id: string, updates: Partial<CMSElement>) => {
    const updateInElements = (elements: CMSElement[]): CMSElement[] => {
      return elements.map((el) => {
        if (el.id === id) {
          return { ...el, ...updates };
        }
        if (el.children) {
          return { ...el, children: updateInElements(el.children) };
        }
        return el;
      });
    };

    setActivePage((prev) => ({
      ...prev,
      elements: updateInElements(prev.elements),
    }));

    if (selectedElement?.id === id) {
      setSelectedElement({ ...selectedElement, ...updates });
    }
  };

  // Delete element
  const deleteElement = (id: string) => {
    const removeFromElements = (elements: CMSElement[]): CMSElement[] => {
      return elements
        .filter((el) => el.id !== id)
        .map((el) => {
          if (el.children) {
            return { ...el, children: removeFromElements(el.children) };
          }
          return el;
        });
    };

    setActivePage((prev) => ({
      ...prev,
      elements: removeFromElements(prev.elements),
    }));

    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  // Move element (drag and drop)
  const moveElement = (dragId: string, hoverId: string) => {
    setActivePage((prev) => {
      const elements = [...prev.elements];
      const dragIndex = elements.findIndex((el) => el.id === dragId);
      const hoverIndex = elements.findIndex((el) => el.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return prev;
      
      const [draggedElement] = elements.splice(dragIndex, 1);
      elements.splice(hoverIndex, 0, draggedElement);
      
      return { ...prev, elements };
    });
  };

  return (
    <div className="flex h-[calc(100vh-120px)] -m-8 gap-0">
      {/* Left Sidebar - Element Palette */}
      <div className="w-64 bg-pitch-dark border-r border-white/10 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("pages")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "pages" ? "text-pitch-gold border-b-2 border-pitch-gold" : "text-gray-400"
            }`}
          >
            Pages
          </button>
          <button
            onClick={() => setActiveTab("elements")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "elements" ? "text-pitch-gold border-b-2 border-pitch-gold" : "text-gray-400"
            }`}
          >
            Elements
          </button>
          <button
            onClick={() => setActiveTab("layers")}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "layers" ? "text-pitch-gold border-b-2 border-pitch-gold" : "text-gray-400"
            }`}
          >
            Layers
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "pages" && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase mb-3">Your Pages</p>
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    activePage.id === page.id
                      ? "bg-pitch-gold text-black"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {page.name}
                  <span className="text-xs opacity-60 ml-2">{page.slug}</span>
                </button>
              ))}
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 border border-dashed border-white/20">
                + Add Page
              </button>
            </div>
          )}

          {activeTab === "elements" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 uppercase">Add Elements</p>
              <p className="text-xs text-gray-400">Drag elements to canvas or click to add</p>
              
              <div className="grid grid-cols-2 gap-2">
                <ElementButton
                  icon="H1"
                  label="Heading"
                  onClick={() => addElement(ELEMENT_TYPES.HEADING)}
                />
                <ElementButton
                  icon="T"
                  label="Text"
                  onClick={() => addElement(ELEMENT_TYPES.TEXT)}
                />
                <ElementButton
                  icon="▢"
                  label="Button"
                  onClick={() => addElement(ELEMENT_TYPES.BUTTON)}
                />
                <ElementButton
                  icon="🖼"
                  label="Image"
                  onClick={() => addElement(ELEMENT_TYPES.IMAGE)}
                />
                <ElementButton
                  icon="☐"
                  label="Container"
                  onClick={() => addElement(ELEMENT_TYPES.CONTAINER)}
                />
                <ElementButton
                  icon="—"
                  label="Divider"
                  onClick={() => addElement(ELEMENT_TYPES.DIVIDER)}
                />
              </div>

              <p className="text-xs text-gray-500 mt-4">
                💡 Tip: Drag elements here or click to add at the bottom.
              </p>
            </div>
          )}

          {activeTab === "layers" && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase mb-3">Layer Order</p>
              {activePage.elements.length === 0 ? (
                <p className="text-xs text-gray-400">No elements on canvas</p>
              ) : (
                activePage.elements.map((el, index) => (
                  <div
                    key={el.id}
                    onClick={() => setSelectedElement(el)}
                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                      selectedElement?.id === el.id
                        ? "bg-pitch-gold text-black"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xs opacity-60 mr-2">{index + 1}</span>
                    {el.type}
                    {el.type === ELEMENT_TYPES.CONTAINER && el.children && (
                      <span className="text-xs opacity-60 ml-2">
                        ({el.children.length} children)
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-[#0a0a0a] overflow-auto p-8">
        <div className="max-w-4xl mx-auto bg-pitch-dark rounded-xl border border-white/10 min-h-[600px] p-4">
          {activePage.elements.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <p className="text-gray-400 mb-2">Canvas is empty</p>
                <p className="text-xs text-gray-500">
                  Add elements from the left panel
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {activePage.elements.map((element) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElement?.id === element.id}
                  onSelect={() => setSelectedElement(element)}
                  onDelete={() => deleteElement(element.id)}
                  moveElement={moveElement}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Style Panel */}
      <div className="w-80 bg-pitch-dark border-l border-white/10 overflow-y-auto">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <span className="font-medium">Style</span>
            <div className="flex gap-2">
              <button className="text-xs px-2 py-1 bg-white/5 rounded">Settings</button>
              <button className="text-xs px-2 py-1 bg-white/5 rounded">Code</button>
            </div>
          </div>
        </div>

        {selectedElement ? (
          <div className="p-4 space-y-6">
            <div>
              <p className="text-xs text-gray-500 uppercase mb-2">Styling: {selectedElement.type.toUpperCase()}</p>
            </div>

            {/* Content */}
            {selectedElement.type !== ELEMENT_TYPES.DIVIDER && selectedElement.type !== ELEMENT_TYPES.CONTAINER && (
              <div>
                <label className="text-xs text-gray-400 block mb-2">Content</label>
                <textarea
                  value={selectedElement.content}
                  onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                  className="w-full bg-pitch-black border border-white/10 rounded-lg p-2 text-sm resize-none h-20"
                />
              </div>
            )}

            {/* Typography */}
            {(selectedElement.type === ELEMENT_TYPES.HEADING || selectedElement.type === ELEMENT_TYPES.TEXT || selectedElement.type === ELEMENT_TYPES.BUTTON) && (
              <div>
                <p className="text-xs text-gray-500 uppercase mb-3">Typography</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Size</label>
                    <input
                      type="text"
                      value={selectedElement.styles.fontSize || "16px"}
                      onChange={(e) => updateElement(selectedElement.id, { 
                        styles: { ...selectedElement.styles, fontSize: e.target.value } 
                      })}
                      className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Weight</label>
                    <select
                      value={selectedElement.styles.fontWeight || "normal"}
                      onChange={(e) => updateElement(selectedElement.id, { 
                        styles: { ...selectedElement.styles, fontWeight: e.target.value } 
                      })}
                      className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                    >
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="600">600</option>
                      <option value="700">700</option>
                      <option value="800">800</option>
                      <option value="900">900</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Colors */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-3">Colors</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Text</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedElement.styles.color || "#ffffff"}
                      onChange={(e) => updateElement(selectedElement.id, { 
                        styles: { ...selectedElement.styles, color: e.target.value } 
                      })}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedElement.styles.color || "#ffffff"}
                      onChange={(e) => updateElement(selectedElement.id, { 
                        styles: { ...selectedElement.styles, color: e.target.value } 
                      })}
                      className="flex-1 bg-pitch-black border border-white/10 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedElement.styles.backgroundColor || "#000000"}
                      onChange={(e) => updateElement(selectedElement.id, { 
                        styles: { ...selectedElement.styles, backgroundColor: e.target.value } 
                      })}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedElement.styles.backgroundColor || "#000000"}
                      onChange={(e) => updateElement(selectedElement.id, { 
                        styles: { ...selectedElement.styles, backgroundColor: e.target.value } 
                      })}
                      className="flex-1 bg-pitch-black border border-white/10 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-3">Spacing</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Padding</label>
                  <input
                    type="text"
                    value={selectedElement.styles.padding || "10px"}
                    onChange={(e) => updateElement(selectedElement.id, { 
                      styles: { ...selectedElement.styles, padding: e.target.value } 
                    })}
                    className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Margin</label>
                  <input
                    type="text"
                    value={selectedElement.styles.margin || "10px"}
                    onChange={(e) => updateElement(selectedElement.id, { 
                      styles: { ...selectedElement.styles, margin: e.target.value } 
                    })}
                    className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-3">Size</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Width</label>
                  <input
                    type="text"
                    value={selectedElement.styles.width || "auto"}
                    onChange={(e) => updateElement(selectedElement.id, { 
                      styles: { ...selectedElement.styles, width: e.target.value } 
                    })}
                    className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Height</label>
                  <input
                    type="text"
                    value={selectedElement.styles.height || "auto"}
                    onChange={(e) => updateElement(selectedElement.id, { 
                      styles: { ...selectedElement.styles, height: e.target.value } 
                    })}
                    className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Border */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-3">Border</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Radius</label>
                  <input
                    type="text"
                    value={selectedElement.styles.borderRadius || "0px"}
                    onChange={(e) => updateElement(selectedElement.id, { 
                      styles: { ...selectedElement.styles, borderRadius: e.target.value } 
                    })}
                    className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Border</label>
                  <input
                    type="text"
                    value={selectedElement.styles.border || "none"}
                    onChange={(e) => updateElement(selectedElement.id, { 
                      styles: { ...selectedElement.styles, border: e.target.value } 
                    })}
                    className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                    placeholder="1px solid #333"
                  />
                </div>
              </div>
            </div>

            {/* Effects */}
            <div>
              <p className="text-xs text-gray-500 uppercase mb-3">Effects</p>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Box Shadow</label>
                <input
                  type="text"
                  value={selectedElement.styles.boxShadow || "none"}
                  onChange={(e) => updateElement(selectedElement.id, { 
                    styles: { ...selectedElement.styles, boxShadow: e.target.value } 
                  })}
                  className="w-full bg-pitch-black border border-white/10 rounded px-2 py-1 text-sm"
                  placeholder="0 4px 6px rgba(0,0,0,0.1)"
                />
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="w-full py-2 bg-red-500/20 text-red-500 rounded-lg text-sm hover:bg-red-500/30 transition"
            >
              Delete Element
            </button>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-400 text-sm">
            Select an element to edit its styles
          </div>
        )}
      </div>
    </div>
  );
}

function ElementButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-3 bg-pitch-black border border-white/10 rounded-lg hover:border-pitch-gold/50 transition"
    >
      <span className="text-lg mb-1">{icon}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </button>
  );
}

function CanvasElement({
  element,
  isSelected,
  onSelect,
  onDelete,
  moveElement,
}: {
  element: CMSElement;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  moveElement: (dragId: string, hoverId: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", element.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId !== element.id) {
      moveElement(draggedId, element.id);
    }
  };

  const baseStyles: React.CSSProperties = {
    ...element.styles,
    opacity: isDragging ? 0.5 : (element.styles.opacity || 1),
  };

  const renderElement = () => {
    switch (element.type) {
      case ELEMENT_TYPES.HEADING:
        return <h2 style={baseStyles}>{element.content}</h2>;
      case ELEMENT_TYPES.TEXT:
        return <p style={baseStyles}>{element.content}</p>;
      case ELEMENT_TYPES.BUTTON:
        return (
          <button style={baseStyles} className="cursor-default">
            {element.content}
          </button>
        );
      case ELEMENT_TYPES.IMAGE:
        return (
          <img
            src={element.content}
            alt="CMS Image"
            style={baseStyles}
            className="max-w-full"
          />
        );
      case ELEMENT_TYPES.CONTAINER:
        return (
          <div style={baseStyles}>
            {element.children && element.children.length > 0 ? (
              element.children.map((child) => (
                <CanvasElement
                  key={child.id}
                  element={child}
                  isSelected={false}
                  onSelect={() => {}}
                  onDelete={() => {}}
                  moveElement={moveElement}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center text-sm py-4">
                Drop elements here
              </p>
            )}
          </div>
        );
      case ELEMENT_TYPES.DIVIDER:
        return <hr style={baseStyles} />;
      default:
        return <div style={baseStyles}>{element.content}</div>;
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`relative cursor-move ${
        isSelected ? "ring-2 ring-pitch-gold ring-offset-2 ring-offset-pitch-dark" : ""
      }`}
    >
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-pitch-gold text-black text-xs px-2 py-0.5 rounded-t">
          {element.type}
        </div>
      )}
      {renderElement()}
    </div>
  );
}
