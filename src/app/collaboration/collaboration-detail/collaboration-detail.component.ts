import { ClipboardService } from "ngx-clipboard";
import { Collaboration } from "./../collaboration-list/collaboration-list.component";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DynamicDialogRef } from "primeng/api";
import { DynamicDialogConfig } from "primeng/api";
import { CollaborationServices } from "./../../services/collaboration.services";
import { MessageService } from "primeng/api";
@Component({
  selector: "app-collaboration-detail",
  templateUrl: "./collaboration-detail.component.html",
  styleUrls: ["./collaboration-detail.component.scss"],
})
export class CollaborationDetailComponent implements OnInit {
  @ViewChild("copyShareUrl") copyShareUrl: any;
  currentCollaboration: Collaboration;
  viewBanner = false;
  isLoading = false;
  listBanner = [];
  loadBannerError = false;
  timeoutUpdateClickReferralLink: any;
  disableCopyBtn = false;

  constructor(
    private collaborationServices: CollaborationServices,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _clipboardService: ClipboardService,
    private messageService: MessageService
  ) {
    this.collaborationServices
      .getReferralProgram(config.data.referralProgramUserId)
      .subscribe((res) => {
        this.currentCollaboration = {
          ...res.result.data,
          ...{ statusDisplay: config.data.statusDisplay },
        };
      });
  }

  ngOnInit() {}

  close() {
    this.ref.close();
  }

  copy(text: string) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Copy Link Success",
    });
    if (this.disableCopyBtn == false) {
      clearTimeout(this.timeoutUpdateClickReferralLink);
      this.disableCopyBtn = true;
      this.collaborationServices
        .updateClickReferralLink(this.currentCollaboration.referralCode)
        .subscribe((res) => {});
      this.timeoutUpdateClickReferralLink = setTimeout(() => {
        this.disableCopyBtn = false;
      }, 2000);
    }
  }

  viewListBanner(banner) {
    this.viewBanner = true;
    this.getBannerDesign(banner.programBannerId);
  }
  cancelViewBanner() {
    this.viewBanner = false;
  }

  getBannerDesign(bannerId) {
    this.isLoading = true;
    this.loadBannerError = false;
    this.collaborationServices.getLsBannerDesignByBannerId(bannerId).subscribe(
      (res) => {
        this.listBanner = res.result.data;
        this.isLoading = false;
        this.loadBannerError = false;
      },
      (error) => {
        this.isLoading = false;
        this.loadBannerError = true;
      }
    );
  }
}
