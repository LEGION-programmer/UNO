class CreatePlayer{
    id:number
    playerNickanme:string
    isOwner:boolean
    hisTour:boolean

    public constructor(id:number, playerNickname:string, isOwner:boolean, hisTour:boolean){
        this.id = id
        this.playerNickanme = playerNickname
        this.isOwner = isOwner
        this.hisTour = hisTour
    }
}

export default CreatePlayer