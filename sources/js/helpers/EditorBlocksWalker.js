

export default class EditorBlocksWalker {

    constructor(){

        this.ligatures         = [] ;
        this.blockList         = [] ;

        this.isReadyToParse    = false ;
        this.firstBlocks       = [] ;
        this.blocksCount       = {} ;
        this.maxBlocksCount    =  0 ;
        this.blocksTotal       =  0 ;

        this.blockMatrix       = {} ;

        this.selectedLigatures = [] ;

    }

    /**
     * Walk through the blocks
     * Test Ligatures Collection and Create Ligatures Possibilities
     * 
     * @returns {void}
     */
    walk(){

        if( ! this.isReadyToParse ){
            this.setFirstBlocks();
            this.setLigaturesBlocksCount();
            this.isReadyToParse = true ;
        }

        let blocksTotal = Object.entries( this.blockList );
        this.blocksTotal = blocksTotal.length ;

        this.parseLigatures();

        // À ce niveau, on a les ligatures dans this.selectedLigatures :D
    }


    setLigatures( list ){ this.ligatures = list; }
    getLigatures(){ return this.ligatures ; }

    setBlockList( list ){ this.blockList = list; }
    getBlockList(){ return this.blockList ; }


    getAvailableLigatures(){

        return this.selectedLigatures ;
    }


    /**
     * List les blocks qui doivent être au départ de ligatures
     */
    setFirstBlocks(){

        let firstBlocks = [];

        const blockLigaturesEntries = Object.entries( this.ligatures );

        blockLigaturesEntries.forEach( function( ligature, index){
            const obj = ligature[1] ;
            const pattern = obj.pattern ;
            firstBlocks.push( pattern[0] ) ;
        });

        const filteredFirstBlocks = firstBlocks.filter(function(ele , pos){
            return firstBlocks.indexOf(ele) == pos;
        })

        this.firstBlocks = filteredFirstBlocks ;

    }


    /**
     * Block count des ligatures
     */
    setLigaturesBlocksCount(){

        const blockLigaturesEntries = Object.entries( this.ligatures );

        let theUpdatedBlockCount ;
        let theMaxBlocksCount = 0 ;

        blockLigaturesEntries.forEach( ( ligature, index) => {

            const obj     = ligature[1] ;
            const pattern = obj.pattern ;

            if( theMaxBlocksCount < pattern.length ){
                theMaxBlocksCount = pattern.length ;
            }

            theUpdatedBlockCount = {
                [obj.slug] : pattern.length,
                ...this.blocksCount
            };

            this.blocksCount = theUpdatedBlockCount ;
        });

        // this.blocksCount = theUpdatedBlockCount ;

        if( this.maxBlocksCount < theMaxBlocksCount ){
            this.maxBlocksCount = theMaxBlocksCount ;
        }
    }



    /**
     * Parse les blocks
     */
    parseLigatures(){

        let theFirstBlocks    = this.firstBlocks ;
        let theBlocksTotal    = this.blocksTotal ;
        let theBlocksCount    = this.blocksCount ;
        let theMaxBlocksCount = this.maxBlocksCount ;
        let theBlockMatrix    = {} ;

        let mainIndex = 0;

        this.selectedLigatures = [] ;

        this.blockList.forEach( ( block, index ) => {

            // besoin dun truc bien plus évolué que cest deux checks...

            // double check
            mainIndex = index ;


            let blockRef    = null ;
            let currentBlock = block ;


            if( theFirstBlocks.indexOf( block.name ) < 0 ){
                return ;
            }else{
                blockRef = theFirstBlocks.indexOf( block.name ) ;
                blockRef = theFirstBlocks[ blockRef ] ;
            }

            // test ligatures passe dans le nombre de blocks restants

            let legitLigatures = [];

            const blocksCountArray = Object.entries( theBlocksCount );



            blocksCountArray.forEach( function( obj, index ){
                let count = obj[1] ;
                if( ( mainIndex  ) + count > theBlocksTotal  ){ return ; }
                legitLigatures.push( obj ) ;
            });

            this.checkLigaturesOnBlock( currentBlock, legitLigatures, index );
        });

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // À ce niveau, on a les ligatures dans this.selectedLigatures :D
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    }


    /**
     * 
     */
    getLigatureObject( slug ){

        let ligatures =  this.getLigatures();

        const ligaturesList = Object.entries( ligatures );

        let found ;

        ligaturesList.forEach( ( obj, index ) => {

            let this_slug = obj[1].slug ;
            if( slug === this_slug ){ found =  obj[1] ; return ; }

        });

        return found ;

    }



    /**
     * 
     * @param {*} currentBlock 
     * @param {*} legitLigatures 
     */
    checkLigaturesOnBlock( currentBlock, legitLigatures, blockIndex ){


        legitLigatures.forEach( ( obj, index ) => {

            let the_ligature = this.getLigatureObject( obj[0] ) ;
            let the_pattern = the_ligature.pattern ;

            let step_finish = ( the_pattern.length ) -1 ;

            const the_blockList = this.blockList ;

            let start  = false ;
            let finish = false ;

            let BlockStart  = 0 ;
            let BlockInList = [];
            let BlockEnd    = 0 ;

            let ref  = 0 ;
            let step = 0 ;

            //
            the_blockList.forEach( ( obj, index ) => {

                if(
                    ( obj.clientId === currentBlock.clientId ) &&
                    ( obj.name ===  the_pattern[ step ])
                    ){
                    start = true ;

                    BlockStart = obj.clientId ;
                    ref   = index ;
                    step ++ ;
                }

                if(
                    ( true === start && ref === ( index - 1 ) ) &&
                    ( obj.name ===  the_pattern[ step ] )
                    ){

                    // on se suit depuis la step precedente
                    // tets si pattern complet
                    if( step === step_finish ){
                        finish = true ;
                        BlockEnd = obj.clientId ;
                        return ;
                    }

                    BlockInList.push( obj.clientId ) ;

                    ref   = index ;
                    step ++ ;

                }


            });

            if( finish ){

                // store

                let data = {} ;
                data.slug       = the_ligature.slug;
                data.blockStart = BlockStart ;
                data.blockIn    = BlockInList ;
                data.blockEnd   = BlockEnd ;
                
                this.selectedLigatures.push( data ) ;
            }

        });

    }

}