var documenterSearchIndex = {"docs":
[{"location":"#WriteVTK.jl","page":"Home","title":"WriteVTK.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for WriteVTK.jl","category":"page"},{"location":"","page":"Home","title":"Home","text":"DocTestSetup = quote\n    using WriteVTK\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [WriteVTK, VTKCellTypes, PolyData]","category":"page"},{"location":"#WriteVTK.VTKDataType","page":"Home","title":"WriteVTK.VTKDataType","text":"VTKDataType\n\nUnion of data types allowed by VTK.\n\n\n\n\n\n","category":"type"},{"location":"#WriteVTK.AbstractFieldData","page":"Home","title":"WriteVTK.AbstractFieldData","text":"AbstractFieldData\n\nAbstract type representing any kind of dataset.\n\n\n\n\n\n","category":"type"},{"location":"#WriteVTK.AbstractVTKDataset","page":"Home","title":"WriteVTK.AbstractVTKDataset","text":"AbstractVTKDataset\n\nAbstract type representing any structured or unstructured VTK dataset.\n\nThe dataset classification is described in the VTK file format specification, page 12.\n\n\n\n\n\n","category":"type"},{"location":"#WriteVTK.MeshCell","page":"Home","title":"WriteVTK.MeshCell","text":"MeshCell\n\nSingle cell element in unstructured or polygonal grid.\n\nIt is characterised by a cell type (for instance, VTKCellType.TRIANGLE or PolyData.Strips) and by a connectivity vector determining the points on the grid defining this cell.\n\n\n\nMeshCell(cell_type, connectivity::AbstractVector)\n\nDefine a single cell element of an unstructured grid.\n\nThe cell_type argument characterises the type of cell (e.g. vertex, triangle, hexaedron, ...):\n\ncell types for unstructured datasets are defined in the VTKCellTypes\n\nmodule;\n\ncell types for polygonal datasets are defined in the PolyData module.\n\nThe connectivity argument is a vector containing the indices of the points passed to vtk_grid which define this cell.\n\nExample\n\nDefine a triangular cell passing by points with indices [3, 5, 42].\n\njulia> cell = MeshCell(VTKCellTypes.VTK_TRIANGLE, [3, 5, 42])\nMeshCell{VTKCellType,Array{Int64,1}}(VTKCellType(\"VTK_TRIANGLE\", 0x05, 3), [3, 5, 42])\n\n\n\n\n\n","category":"type"},{"location":"#WriteVTK.StructuredVTKDataset","page":"Home","title":"WriteVTK.StructuredVTKDataset","text":"StructuredVTKDataset <: AbstractVTKDataset\n\nAbstract type representing a structured VTK dataset.\n\nSubtypes are VTKImageData, VTKRectilinearGrid and VTKStructuredGrid.\n\n\n\n\n\n","category":"type"},{"location":"#WriteVTK.UnstructuredVTKDataset","page":"Home","title":"WriteVTK.UnstructuredVTKDataset","text":"UnstructuredVTKDataset <: AbstractVTKDataset\n\nAbstract type representing an unstructured VTK dataset.\n\nSubtypes are VTKPolyData and VTKUnstructuredGrid.\n\n\n\n\n\n","category":"type"},{"location":"#Base.close-Tuple{WriteVTK.VTKFile}","page":"Home","title":"Base.close","text":"close(vtk::VTKFile)\n\nWrite and close VTK file.\n\n\n\n\n\n","category":"method"},{"location":"#Base.isopen-Tuple{WriteVTK.VTKFile}","page":"Home","title":"Base.isopen","text":"isopen(vtk::VTKFile)\n\nCheck if VTK file is still being written.\n\n\n\n\n\n","category":"method"},{"location":"#Base.setindex!-Tuple{WriteVTK.DatasetFile,Any,AbstractString,WriteVTK.AbstractFieldData}","page":"Home","title":"Base.setindex!","text":"setindex!(vtk::DatasetFile, data, name::AbstractString, [field_type])\n\nAdd a new dataset to VTK file.\n\nThe number of components of the dataset (e.g. for scalar or vector fields) is determined automatically from the input data dimensions.\n\nThe optional argument field_type should be an instance of VTKPointData, VTKCellData or VTKFieldData. It determines whether the data should be associated to grid points, cells or none. If not given, this is guessed from the input data size and the grid dimensions.\n\nExample\n\nAdd \"velocity\" dataset and time scalar to VTK file.\n\nvel = rand(3, 12, 14, 42)  # vector field\ntime = 42.0\n\nvtk = vtk_grid(...)\nvtk[\"velocity\", VTKPointData()] = vel\nvtk[\"time\", VTKFieldData()] = time\n\n# This also works, and will generally give the same result:\nvtk[\"velocity\"] = vel\nvtk[\"time\"] = time\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.add_field_data-Tuple{WriteVTK.DatasetFile,Any,AbstractString,WriteVTK.AbstractFieldData}","page":"Home","title":"WriteVTK.add_field_data","text":"add_field_data(vtk::DatasetFile, data,\n               name::AbstractString, loc::AbstractFieldData)\n\nAdd either point or cell data to VTK file.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.data_to_xml","page":"Home","title":"WriteVTK.data_to_xml","text":"data_to_xml(\n    vtk::DatasetFile, xParent::XMLElement, data,\n    name::AbstractString, Nc::Union{Int,AbstractFieldData} = 1,\n)\n\nAdd numerical data to VTK XML file.\n\nData is written under the xParent XML node.\n\nNc may be either the number of components, or the type of field data. In the latter case, the number of components will be deduced from the data dimensions and the type of field data.\n\n\n\n\n\n","category":"function"},{"location":"#WriteVTK.data_to_xml_appended-Tuple{WriteVTK.DatasetFile,LightXML.XMLElement,Any}","page":"Home","title":"WriteVTK.data_to_xml_appended","text":"data_to_xml_appended(vtk::DatasetFile, xDA::XMLElement, data)\n\nAdd appended raw binary data to VTK XML file.\n\nData is written to the vtk.buf buffer.\n\nWhen compression is enabled:\n\nthe data array is written in compressed form (obviously);\nthe header, written before the actual numerical data, is an array of\n\nHeaderType (UInt32 / UInt64) values:         [num_blocks, blocksize, last_blocksize, compressed_blocksizes]     All the sizes are in bytes. The header itself is not compressed, only the     data is.     For more details, see:         http://public.kitware.com/pipermail/paraview/2005-April/001391.html         http://mathema.tician.de/what-they-dont-tell-you-about-vtk-xml-binary-formats     (This is not really documented in the VTK specification...)\n\nOtherwise, if compression is disabled, the header is just a single HeaderType value containing the size of the data array in bytes.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.data_to_xml_ascii-Tuple{WriteVTK.DatasetFile,LightXML.XMLElement,Any}","page":"Home","title":"WriteVTK.data_to_xml_ascii","text":"data_to_xml_ascii(vtk::DatasetFile, xDA::XMLElement, data)\n\nAdd inline data to VTK XML file in ASCII format.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.data_to_xml_inline-Tuple{WriteVTK.DatasetFile,LightXML.XMLElement,Any}","page":"Home","title":"WriteVTK.data_to_xml_inline","text":"data_to_xml_inline(vtk::DatasetFile, xDA::XMLElement, data)\n\nAdd inline, base64-encoded data to VTK XML file.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.paraview_collection-Tuple{Function,Vararg{Any,N} where N}","page":"Home","title":"WriteVTK.paraview_collection","text":"paraview_collection(f::Function, args...; kwargs...)\n\nCreate VTK file and apply f to it. The file is automatically closed by the end of the call.\n\nThis allows to use the do-block syntax for creating VTK files:\n\nsaved_files = paraview_collection(args...; kwargs...) do vtk\n    # do stuff with the `vtk` file handler\nend\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.paraview_collection_load-Tuple{Function,Vararg{Any,N} where N}","page":"Home","title":"WriteVTK.paraview_collection_load","text":"paraview_collection_load(f::Function, args...; kwargs...)\n\nCreate VTK file and apply f to it. The file is automatically closed by the end of the call.\n\nThis allows to use the do-block syntax for creating VTK files:\n\nsaved_files = paraview_collection_load(args...; kwargs...) do vtk\n    # do stuff with the `vtk` file handler\nend\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.save_with_appended_data-Tuple{WriteVTK.DatasetFile}","page":"Home","title":"WriteVTK.save_with_appended_data","text":"Write VTK XML file containing appended binary data to disk.\n\nIn this case, the XML file is written manually instead of using the save_file function of LightXML, which doesn't allow to write raw binary data.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_grid-Tuple{Function,Vararg{Any,N} where N}","page":"Home","title":"WriteVTK.vtk_grid","text":"vtk_grid(f::Function, args...; kwargs...)\n\nCreate VTK file and apply f to it. The file is automatically closed by the end of the call.\n\nThis allows to use the do-block syntax for creating VTK files:\n\nsaved_files = vtk_grid(args...; kwargs...) do vtk\n    # do stuff with the `vtk` file handler\nend\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_grid-Tuple{WriteVTK.MultiblockFile,AbstractString,Vararg{Any,N} where N}","page":"Home","title":"WriteVTK.vtk_grid","text":"vtk_grid(vtm::MultiblockFile, [filename], griddata...; kwargs...)\n\nCreate new dataset file that is added to an existent multiblock file. The VTK grid is specified by the elements of griddata.\n\nIf the filename is not given, it is determined automatically from the filename of the vtm file and the number of existent blocks.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_grid-Tuple{WriteVTK.VTKBlock,AbstractString,Vararg{Any,N} where N}","page":"Home","title":"WriteVTK.vtk_grid","text":"vtk_grid(vtb::vtkBlock, [filename], griddata...; kwargs...)\n\nCreate new dataset file that is added to an existent VTKBlock. The VTK grid is specified by the elements of griddata.\n\nIf the filename is not given, it is determined automatically from the filename of the vtb file and the number of existent blocks.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_grid-Union{Tuple{T}, Tuple{AbstractString,AbstractArray{T,1},AbstractArray{T,1},AbstractArray{T,1}}} where T","page":"Home","title":"WriteVTK.vtk_grid","text":"vtk_grid(filename::AbstractString,\n         x::AbstractVector{T}, y::AbstractVector{T}, [z::AbstractVector{T}];\n         kwargs...)\n\nCreate 2D or 3D rectilinear grid (.vtr) file.\n\nCoordinates are specified by separate vectors x, y, z.\n\nExamples\n\njulia> vtk = vtk_grid(\"abc\", [0., 0.2, 0.5], collect(-2.:0.2:3), [1., 2.1, 2.3])\nVTK file 'abc.vtr' (RectilinearGrid file, open)\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_grid-Union{Tuple{T}, Tuple{AbstractString,Vararg{AbstractRange{T},N} where N}} where T","page":"Home","title":"WriteVTK.vtk_grid","text":"vtk_grid(filename, x::AbstractRange{T}, y::AbstractRange{T}, [z::AbstractRange{T}];\n         kwargs...)\n\nCreate image data (.vti) file.\n\nAlong each direction, the grid is specified in terms of an AbstractRange object.\n\nExamples\n\njulia> vtk = vtk_grid(\"abc\", 1:0.2:5, 2:1.:3, 4:1.:5)  # 3D dataset\nVTK file 'abc.vti' (ImageData file, open)\n\njulia> vtk = vtk_grid(\"abc\", 1:0.2:5, 2:1.:3)  # 2D dataset\nVTK file 'abc.vti' (ImageData file, open)\n\njulia> vtk = vtk_grid(\"def\",\n                      LinRange(0., 5., 10),\n                      LinRange(0., 2π, 16),\n                      LinRange(1., 10., 12))\nVTK file 'def.vti' (ImageData file, open)\n\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_multiblock-Tuple{Function,Vararg{Any,N} where N}","page":"Home","title":"WriteVTK.vtk_multiblock","text":"vtk_multiblock(f::Function, args...; kwargs...)\n\nCreate VTK file and apply f to it. The file is automatically closed by the end of the call.\n\nThis allows to use the do-block syntax for creating VTK files:\n\nsaved_files = vtk_multiblock(args...; kwargs...) do vtk\n    # do stuff with the `vtk` file handler\nend\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_save-Tuple{WriteVTK.MultiblockFile}","page":"Home","title":"WriteVTK.vtk_save","text":"vtk_save(vtm::MultiblockFile)\n\nSave and close multiblock file (.vtm). The VTK files included in the multiblock file are also saved.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.vtk_write_array-Union{Tuple{S}, Tuple{A}, Tuple{N}, Tuple{M}, Tuple{T}, Tuple{AbstractString,Tuple{Vararg{A,M}},Tuple{Vararg{S,M}}}} where S<:AbstractString where A<:AbstractArray{T,N} where N where M where T<:Real","page":"Home","title":"WriteVTK.vtk_write_array","text":"vtk_write_array(filename, arrays, labels)\nvtk_write_array(filename, array, label=\"array\")\n\nWrite Julia arrays to a VTK image data file (.vti).\n\nUseful for general visualisation of arrays. The input can be a 2D or 3D array.\n\nMultiple arrays can be given as a tuple, e.g.\n\nvtk_write_array(filename, (x, y), (\"x\", \"y\"))\n\nIn that case, the arrays must have the same dimensions.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.VTKCellTypes","page":"Home","title":"WriteVTK.VTKCellTypes","text":"VTKCellTypes\n\nModule defining cell types for unstructured datasets.\n\nDefinitions are adapted from the VTK source code.\n\n\n\n\n\n","category":"module"},{"location":"#WriteVTK.VTKCellTypes.nodes-Tuple{VTKCellType}","page":"Home","title":"WriteVTK.VTKCellTypes.nodes","text":"nodes(c::VTKCellTypes)\n\nReturns the number of nodes (or grid points) required by the cell type.\n\nFor instance, this returns 3 for VTK_TRIANGLE.\n\nFor cell types that can take any number of nodes, such as VTK_POLY_LINE, this returns -1.\n\n\n\n\n\n","category":"method"},{"location":"#WriteVTK.PolyData","page":"Home","title":"WriteVTK.PolyData","text":"PolyData\n\nDefines cell types for polygonal datasets.\n\nThe following singleton types are defined:\n\nPolyData.Verts for vertices,\nPolyData.Lines for lines,\nPolyData.Strips for triangular strips,\nPolyData.Polys for polygons.\n\n\n\n\n\n","category":"module"}]
}
